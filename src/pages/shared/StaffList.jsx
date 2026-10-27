import {
  CONTAINER_WRAPPER,
  HEADER_TITLE,
  HEADER_SUBTITLE,
  GRID_CONTAINER,
  STAFF_CARD,
  CARD_HEADER,
  STAFF_AVATAR,
  STAFF_NAME,
  ROLE_BADGE,
  METADATA_CONTAINER,
  META_LABEL,
  META_CAPITALIZE,
  ACTION_CONTAINER,
  ACTION_BUTTON,
} from "../../styles/StaffListStyles";

export const StaffList = ({ staffUsers, setActiveTab }) => {
  return (
    <div className={CONTAINER_WRAPPER}>
      <div>
        <h2 className={HEADER_TITLE}>Liste du Personnel</h2>
        <p className={HEADER_SUBTITLE}>
          Enseignants, administration et secrétariat
        </p>
      </div>

      <div className={GRID_CONTAINER}>
        {staffUsers.map((staff) => (
          <div key={staff.id} className={STAFF_CARD}>
            <div>
              <div className={CARD_HEADER}>
                <img
                  src={staff.photo || "/default-avatar.png"}
                  alt="staff"
                  className={STAFF_AVATAR}
                />
                <div>
                  <h3 className={STAFF_NAME}>
                    {staff.nom} {staff.prenom}
                  </h3>
                  <span className={ROLE_BADGE}>{staff.role}</span>
                </div>
              </div>

              <div className={METADATA_CONTAINER}>
                <p>
                  <span className={META_LABEL}>Email :</span>{" "}
                  {staff.email || "Non renseigné"}
                </p>
                <p>
                  <span className={META_LABEL}>Contact :</span>{" "}
                  {staff.contact || "Non renseigné"}
                </p>
                <p>
                  <span className={META_LABEL}>Genre :</span>{" "}
                  <span className={META_CAPITALIZE}>
                    {staff.genre || "Non spécifié"}
                  </span>
                </p>
              </div>
            </div>

            {staff.role === "prof" && (
              <div className={ACTION_CONTAINER}>
                <button
                  onClick={() => setActiveTab("pointage")}
                  className={ACTION_BUTTON}
                >
                  Voir le pointage →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffList;
