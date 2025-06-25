import { useForm } from "react-hook-form"

function ReactHookForm() {
    const {
        register,
        handleSubmit,
        watch, 
        formState: { errors }
    }=useForm()

    const valider = handleSubmit((data)=>{
        console.log(data);
        console.log(data.prenom);
        console.log(data.nom);


    })

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <form >
        <input
        {...register("prenom",  { required: "remplir svp" })}
            type="text"
            placehoder="prenom"
            className={`form-control mt-3 ${errors.prenom && 'is-invalid'}`}
        />
        <div className="invalid-feedback">
            {errors.prenom && errors.prenom.message}
        </div>

        <input
            className={`form-control ${errors.nom && 'is-invalid'}`}
            {...register("nom",{
                required:'Veuillez remplir ce champs',
                minLength:{value:3,message:'plus de 3 caractéres'},
                pattern: { value: /^[A-Za-z]+$/i, message: "pas chiffre" },
            })}
        />
        <div className="invalid-feedback">
              {errors.nom && <p role="alert">{errors.nom.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">GO</button>
      </form>
    </div>
  );
}

export default ReactHookForm;                                                                                                                      ;
