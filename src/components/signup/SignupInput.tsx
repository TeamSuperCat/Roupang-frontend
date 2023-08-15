type inputProps = {
  name: string;
  type: string;
  text: string;
  data: {
    email: string;
    password: string;
    passwordCheck: string;
    phoneNumber: string | undefined;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupInput = ({ name, type, text, data, onChange }: inputProps) => {
  return (
    <div>
      <input name={name} type={type} value={data[name]} onChange={(e) => onChange(e)} />
      <label htmlFor='email'>{text}</label>
    </div>
  );
};

export default SignupInput;
