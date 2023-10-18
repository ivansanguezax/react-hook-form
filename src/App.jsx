import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      password: "",
      confirmarPassword: "",
      fechadeNacimiento: "",
      pais: "",
      departamento: "",
      fotoDelUsuario: "",
      terminos: false,
    },
  });

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("Formulario enviado");
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nombre"> Name </label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: {
            value: 2,
            message: "Este campo debe tener al menos 2 caracteres",
          },
          maxLength: {
            value: 20,
            message: "Este campo debe tener menos de 20 caracteres",
          },
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      <label htmlFor="correo">Correo</label>
      <input
        type="text"
        {...register("correo", {
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Correo invalido",
          },
        })}
      />
      {errors.correo && <span>{errors.correo.message}</span>}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Este campo es requerido",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <label htmlFor="confirmarPassword">Confirmar password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          validate: () => {
            return (
              watch("password") === watch("confirmarPassword") ||
              "Las contraseñas no coinciden"
            );
          },
        })}
      />
      {errors.confirmarPassword && (
        <span>{errors.confirmarPassword.message}</span>
      )}
      <label htmlFor="fechadeNacimiento"> Fecha de nacimiento</label>
      <input
        type="date"
        {...register("fechadeNacimiento", {
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          validate: (value) => {
            const fecha = new Date(value);
            const hoy = new Date();
            const edad = hoy.getFullYear() - fecha.getFullYear();
            return edad >= 18 ? true : "Debes ser mayor de edad";
          },
        })}
      />
      {errors.fechadeNacimiento && (
        <span>{errors.fechadeNacimiento.message}</span>
      )}
      <label htmlFor="pais">Pais</label>
      <select {...register("pais")}>
        <option value="mx">Mexico</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>
      {watch("pais") === "co" && (
        <>
          <label htmlFor="departamento">Departamento</label>
          <select
            {...register("departamento", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          >
            <option value="ant">Antioquia</option>
            <option value="atl">Atlantico</option>
            <option value="val">Valle</option>
          </select>
        </>
      )}
      <label htmlFor="file">Foto de Perfil</label>
      <input
        type="file"
        onChange={(e) => {
          setValue("fotoDelUsuario", e.target.files[0].name);
        }}
      />

      <label htmlFor="terminos">Acepto terminos y condiciones</label>
      <input
        type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Este campo es requerido",
          },
        })}
      />
      {errors.terminos && <span>Este campo es requerido</span>}
      <button type="submit">Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}
