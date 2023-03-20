import { useState } from "react";
import "../styles/profile.css";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("email");
  const [dateCreated, setDateCreated] = useState("01/01/2022");

  const handleSave = () => {
    // Aquí podrías enviar una solicitud POST a la API para guardar los cambios
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Aquí podrías restaurar los valores anteriores y cancelar la edición
    setIsEditing(false);
  };

  return (
    <div className=" bg-light profile-container">
      <h1>Perfil de usuario</h1>
      <div className="profile-info">
        <p>
          Nombre de usuario:{" "}
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
        <p>
          Correo electrónico:{" "}
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            email
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


