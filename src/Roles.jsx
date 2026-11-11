import { forwardRef } from 'react';
import './Roles.css';

const roles = [
  { label: 'Founder @ Steel & Stack', href: 'https://steelandstack.com' },
  { label: 'Creative Technologist' },
  { label: 'Full-Stack Developer' },
  { label: 'Robotics Engineer' },
];

const Roles = forwardRef(function Roles(_props, ref) {
  return (
    <section className="roles-section" id="roles" ref={ref}>
      <p className="roles-eyebrow">04 — ROLES</p>
      <ul className="roles-list">
        {roles.map((role) => (
          <li
            key={role.label}
            className={`roles-item${role.href ? ' roles-item--linked' : ''}`}
            tabIndex={role.href ? undefined : 0}
          >
            {role.href ? (
              <a
                className="roles-link"
                href={role.href}
                target="_blank"
                rel="noreferrer"
              >
                {role.label}
              </a>
            ) : (
              role.label
            )}
          </li>
        ))}
      </ul>
    </section>
  );
});

export default Roles;
