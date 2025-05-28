const Input = ({ label, error, ...rest }) => {
  const inputClass = `form-control ${error ? 'is-invalid' : ''}`;

  if (rest.type === 'checkbox') {
    return (
      <div className="form-group mb-3">
        <input className={error ? 'is-invalid' : ''} {...rest} />
        <label>{label}</label>
        {error && error.map((err) => (
          <p key={err} className="invalid">* {err}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="form-group mb-3">
      <label>{label}</label>
      <input className={inputClass} {...rest} />
      {error && error.map((err) => (
        <p key={err} className="invalid">* {err}</p>
      ))}
    </div>
  );
};

export default Input;
