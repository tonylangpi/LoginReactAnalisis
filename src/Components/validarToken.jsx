import React from "react";

import { Link, redirect, useNavigate } from "react-router-dom";

const validarToken = () => {
    

    const apiLogin =  (e) => {
        e.preventDefault();
      
      };

  return (
    <div className="container  w-75  bg-primary mt-5 rounded shadow">
      <div className="row align-items-stretch">
        <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
        <div className="col bg-white p-5 rounded-end">
          <div className="text-end">
            <img src={Logo} width="48px" alt="logo empresarial" />
          </div>
          <h2 className="fw-bold text-center py-5">Ingresa el TOKEN que fue enviado a tu correo registrado</h2>

          <form onSubmit={(e) => apiToken(e)}>
            <div className="mb-4">
              <label for="email" className="form-label">
                TOKEN
              </label>
              <input
                type="email"
                className="form-control"
                name="user"
              />
            </div>
              <button type="submit" className="btn btn-primary">
                Ingresar al sistema
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default validarToken;
