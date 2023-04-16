import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/profile.css";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("username");
  const [dateCreated, setDateCreated] = useState("01/01/2022");
  const session = useSelector((state) => state.session);
  useEffect(() => {
    setUsername(session.username);
    setDateCreated(session.createdDt);
  }, [session.username]);

  const handleSave = async () => {
    const body = {
      username: username,
    };
    await fetch(`http://localhost:5000/api/user/${session.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(body),
    });
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setUsername(session.username);
  };

  return (
    <div className=" bg-light profile-container">
      <h1>Perfil de usuario</h1>
      <div className="profile-info">
        <p>
          Nombre de usuario:
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            username
          )}
        </p>
        <p>Fecha de creación: {dateCreated}</p>
      </div>
      {isEditing ? (
        <div className="profile-buttons">
          <button onClick={handleSave}>Guardar cambios</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      ) : (
        <div className="profile-buttons">
          <button onClick={() => setIsEditing(true)}>Editar perfil</button>
          <button>Historial de compras</button>
        </div>
      )}
    </div>
  );
}
