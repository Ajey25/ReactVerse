import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
export default function EditProfile() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const BIO_LIMIT = 200;

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          country: data.profile?.country || "",
          phone: data.profile?.phone || "",
          gender: data.profile?.gender || "prefer_not_to_say",
          college: data.profile?.college || "",
          degree: data.profile?.degree || "",
          branch: data.profile?.branch || "",
          graduationYear: data.profile?.graduationYear || "",
          location: data.profile?.location || "",
          currentStatus: data.profile?.currentStatus || "student",
          experienceLevel: data.profile?.experienceLevel || "beginner",
          skills: data.profile?.skills?.join(", ") || "",
          linkedin: data.profile?.linkedin || "",
          github: data.profile?.github || "",
          portfolio: data.profile?.portfolio || "",
          bio: data.profile?.bio || "",
        });
      })
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }
  const handleChangeBio = (e) => {
    const { name, value } = e.target;

    if (name === "bio" && value.length > BIO_LIMIT) return;

    setForm({ ...form, [name]: value });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name,
            profile: {
              phone: form.phone,
              gender: form.gender,
              country: form.country,
              college: form.college,
              degree: form.degree,
              branch: form.branch,
              graduationYear: form.graduationYear
                ? Number(form.graduationYear)
                : null,
              location: form.location,
              currentStatus: form.currentStatus,
              experienceLevel: form.experienceLevel,
              skills: form.skills
                ? form.skills.split(",").map((s) => s.trim())
                : [],
              linkedin: form.linkedin,
              github: form.github,
              portfolio: form.portfolio,
              bio: form.bio,
            },
          }),
        },
      );

      if (!res.ok) {
        toast.error("Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Edit Profile</h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm opacity-70 hover:opacity-100"
          >
            ← Back to Dashboard
          </button>
        </div>

        <Section title="Basic">
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            label="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
          />
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={["male", "female", "prefer_not_to_say"]}
          />
        </Section>

        <Section title="Education">
          <Input
            label="College"
            name="college"
            value={form.college}
            onChange={handleChange}
          />
          <Input
            label="Degree"
            name="degree"
            value={form.degree}
            onChange={handleChange}
          />
          <Input
            label="Branch"
            name="branch"
            value={form.branch}
            onChange={handleChange}
          />
          <Input
            label="Graduation Year"
            name="graduationYear"
            value={form.graduationYear}
            onChange={handleChange}
          />
        </Section>

        <Section title="Professional">
          <Select
            label="Current Status"
            name="currentStatus"
            value={form.currentStatus}
            onChange={handleChange}
            options={["student", "fresher", "working_professional"]}
          />
          <Select
            label="Experience Level"
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
            options={["beginner", "intermediate", "advanced"]}
          />
          <Input
            label="Skills (comma separated)"
            name="skills"
            value={form.skills}
            onChange={handleChange}
          />
        </Section>

        <Section title="Links">
          <Input
            label="LinkedIn"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
          />
          <Input
            label="GitHub"
            name="github"
            value={form.github}
            onChange={handleChange}
          />
          <Input
            label="Portfolio"
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
          />
        </Section>

        <Section title="Bio" full>
          <Textarea
            name="bio"
            value={form.bio}
            onChange={handleChangeBio}
            maxLength={BIO_LIMIT}
          />

          <div className="mt-1 text-xs text-right opacity-60">
            {form.bio.length}/{BIO_LIMIT}
          </div>
        </Section>

        <div className="mt-10">
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={saving}
            className="px-6 py-3 rounded-xl text-sm font-medium border"
            style={{ opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[var(--card-bg)] p-6 rounded-xl w-80 border">
            <h3 className="font-medium mb-4">Are you sure?</h3>
            <p className="text-sm opacity-70 mb-6">
              This will update your profile information.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="text-sm opacity-70"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmOpen(false);
                  saveProfile();
                }}
                className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white"
              >
                Yes, Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Section({ title, children, full = false }) {
  return (
    <div className="mb-8 p-6 rounded-2xl  bg-[var(--card-bg)]">
      <h2 className="font-medium mb-4">{title}</h2>
      <div
        className={
          full ? "grid grid-cols-1 gap-4" : "grid sm:grid-cols-2 gap-4"
        }
      >
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs opacity-60">{label}</label>
      <input
        {...props}
        className="px-3 py-2 rounded-lg border bg-transparent outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs opacity-60">{label}</label>
      <select
        {...props}
        className="px-3 py-2 rounded-lg border bg-[var(--card-bg)] outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#1e1e1e] text-white">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={5}
      className="w-full px-3 py-2 rounded-lg border bg-transparent outline-none"
    />
  );
}
