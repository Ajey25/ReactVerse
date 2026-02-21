import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const userId = req.query.userId; // Optional: to get user's rank

    // Get total count for pagination
    const totalUsers = await User.countDocuments();

    // Get leaderboard with pagination
    const leaderboard = await User.aggregate([
      {
        $project: {
          name: 1,
          avatar: 1,
          college: "$profile.college",
          country: "$profile.country",
          // 🔥 Use totalXP, fallback to xp, then 0 - ensures always synced
          xp: { $ifNull: ["$totalXP", { $ifNull: ["$xp", 0] }] },
        },
      },
      { $sort: { xp: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    // Calculate user's rank if userId provided
    let userRank = null;
    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          const userXP = user.totalXP || user.xp || 0;
          
          // Count users with higher XP using aggregation
          const rankResult = await User.aggregate([
            {
              $project: {
                xp: { $ifNull: ["$totalXP", { $ifNull: ["$xp", 0] }] },
              },
            },
            {
              $match: {
                xp: { $gt: userXP },
              },
            },
            {
              $count: "count",
            },
          ]);
          
          const usersAbove = rankResult.length > 0 ? rankResult[0].count : 0;
          userRank = usersAbove + 1;
        }
      } catch (err) {
        console.error("Error calculating user rank:", err);
      }
    }

    const totalPages = Math.ceil(totalUsers / limit);
    const currentRank = skip + 1; // Starting rank for this page

    res.json({
      success: true,
      leaderboard: leaderboard.map((user, index) => ({
        rank: currentRank + index,
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        xp: user.xp, // ✅ ALWAYS PRESENT
        college: user.college || "",
        country: user.country || "",
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      userRank, // User's current rank if userId provided
    });
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to load leaderboard",
    });
  }
});

export default router;
