import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  User,
  Link as LinkIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setUser);
  }, []);

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        Loading profile…
      </div>
    );
  }

  const { profile = {} } = user;

  return (
    <div
      className="px-3 sm:px-4 py-4"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-3xl border p-3 sm:p-4"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          {/* HEADER TOP */}
          <div className="flex items-center justify-between px-2 sm:px-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>

            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm opacity-70 hover:opacity-100"
            >
              ← Back
            </button>
          </div>

          {/* HEADER CONTENT */}
          <header className="flex flex-col gap-4 sm:flex-row sm:gap-6 p-3 sm:p-4 rounded-2xl">
            {/* LEFT SIDE */}
            <div
              className="flex flex-col items-center text-center 
              sm:flex-row sm:items-start sm:text-left 
              gap-4 flex-1 p-4 rounded-2xl border"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              <Avatar user={user} />

              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  {user.name}
                </h2>
                <p className="text-sm opacity-70 mt-1 break-all">
                  {user.email}
                </p>

                <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                  <Badge text={profile.currentStatus} />
                  <Badge text={profile.experienceLevel} />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div
              className="flex-1 p-4 rounded-2xl border flex flex-col"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              <h2 className="font-semibold text-lg sm:text-xl mb-2">About</h2>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed">
                {profile.bio || "No bio added yet."}
              </p>
            </div>
          </header>

          {/* TABS */}
          <div
            className="flex gap-6 border-b mb-4 px-2 sm:px-6 overflow-x-auto no-scrollbar"
            style={{ borderColor: "var(--border)" }}
          >
            <Tab active={tab === "overview"} onClick={() => setTab("overview")}>
              Overview
            </Tab>
            <Tab active={tab === "skills"} onClick={() => setTab("skills")}>
              Skills
            </Tab>
            <Tab active={tab === "links"} onClick={() => setTab("links")}>
              Links
            </Tab>
          </div>

          {/* CONTENT */}
          <div className="px-2 sm:px-6">
            <div className="min-h-[220px]">
              {tab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Section title="Personal Information">
                    <Info icon={<Mail size={16} />} value={user.email} />
                    <Info icon={<Phone size={16} />} value={profile.phone} />
                    <Info
                      icon={<MapPin size={16} />}
                      label="Location"
                      value={profile.location}
                    />
                    <Info
                      icon={<User size={16} />}
                      label="Gender"
                      value={profile.gender}
                    />
                    <Info
                      icon={<MapPin size={16} />}
                      label="Country"
                      value={profile.country}
                    />
                  </Section>

                  <Section title="Education">
                    <Info
                      icon={<GraduationCap size={16} />}
                      label="College"
                      value={profile.college}
                    />
                    <Info
                      icon={<User size={16} />}
                      label="Degree"
                      value={profile.degree}
                    />
                    <Info
                      icon={<User size={16} />}
                      label="Branch"
                      value={profile.branch}
                    />
                    <Info
                      icon={<Calendar size={16} />}
                      label="Graduation Year"
                      value={profile.graduationYear}
                    />
                  </Section>
                </div>
              )}

              {tab === "skills" && (
                <Section title="Skills">
                  {profile.skills?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-lg text-sm border"
                          style={{
                            borderColor: "var(--border)",
                            background: "var(--card-bg)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <Empty />
                  )}
                </Section>
              )}

              {tab === "links" && (
                <Section title="Links">
                  <LinkRow label="GitHub" value={profile.github} />
                  <LinkRow label="LinkedIn" value={profile.linkedin} />
                  <LinkRow label="Portfolio" value={profile.portfolio} />
                </Section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI PARTS ---------------- */

function Avatar({ user }) {
  return (
    <div className="relative shrink-0">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border"
          style={{ borderColor: "var(--border)" }}
        />
      ) : (
        <div
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl flex items-center justify-center
          text-2xl sm:text-3xl font-semibold border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          {user.name?.[0]}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div
      className="p-4 sm:p-6 rounded-2xl border"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--border)",
      }}
    >
      <h2 className="font-semibold mb-4 text-base sm:text-lg">{title}</h2>
      {children}
    </div>
  );
}

function Tab({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 pb-3 text-sm font-medium whitespace-nowrap transition ${
        active ? "border-b-2" : "opacity-60 hover:opacity-100"
      }`}
      style={{
        borderColor: active ? "var(--text)" : "transparent",
      }}
    >
      {children}
    </button>
  );
}

function Badge({ text }) {
  if (!text) return null;
  return (
    <span
      className="px-3 py-1 text-xs rounded-full border"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--border)",
      }}
    >
      {text}
    </span>
  );
}

function Info({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-sm opacity-80 mb-2 break-words">
      {icon}
      <span>{label ? `${label}: ${value}` : value}</span>
    </div>
  );
}

function LinkRow({ label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm mb-2 break-all">
      <LinkIcon size={16} />
      <span className="opacity-70">{label} :</span>

      {value ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="underline opacity-80 hover:opacity-100"
        >
          {value}
        </a>
      ) : (
        <span className="opacity-50">—</span>
      )}
    </div>
  );
}

function Empty() {
  return <p className="text-sm opacity-50">Nothing added yet.</p>;
}
