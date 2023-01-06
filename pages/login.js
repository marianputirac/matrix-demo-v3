import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PasswordSchema = Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter');

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: PasswordSchema
});

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        try {
            const response = await axios.post('/api/login', values);
            console.log(response);
        } catch (error) {
            console.error(error);
            setErrors({ api: 'Error logging in' });
        }
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="username" placeholder="Username" />
                    <ErrorMessage name="username" component="div" />
                    <br />
                    <Field name="password" type="password" placeholder="Password" validate={PasswordSchema} />
                    <ErrorMessage name="password" component="div" />
                    <br />
                    <button type="submit" disabled={isSubmitting}>
                        Log in
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Login;

