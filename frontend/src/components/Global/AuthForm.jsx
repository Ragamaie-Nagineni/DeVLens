function AuthForm({ fields, buttonText }) {
  return (
    <form className="form">

      {fields.map((field, index) => (
        <input
          key={index}
          type={field.type}
          placeholder={field.placeholder}
        />
      ))}

      <button type="submit">
        {buttonText}
      </button>

    </form>
  );
}

export default AuthForm;