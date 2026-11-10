import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="walk" aria-hidden="true">
        <span>🐻</span><span>🐰</span><span>🦊</span><span>🐼</span>
      </div>
      <div className="ft-in" style={{ gridTemplateColumns: "minmax(0,2fr) repeat(2,minmax(0,1fr))" }}>
        <div className="ft-brand">
          <b><span>🐾</span> Critter Academy Admin</b>
          <p>Manage users, content, rewards and the platform from one friendly dashboard.</p>
        </div>
        <div>
          <h4>Admin</h4>
          <ul>
            <li><Link href="/admin/dashboard">Dashboard</Link></li>
            <li><Link href="/admin/users">Users &amp; roles</Link></li>
            <li><Link href="/admin/reports">Reports</Link></li>
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li><Link href="/studio/templates">Templates</Link></li>
            <li><Link href="/studio/editor">Game editor</Link></li>
            <li><Link href="/studio/publish">Publish</Link></li>
          </ul>
        </div>
      </div>
      <div className="ft-bot">
        <span>© 2026 Critter Academy. All rights reserved.</span>
        <span>Made with <span className="hearts">💜</span> for little learners</span>
      </div>
    </footer>
  );
}
