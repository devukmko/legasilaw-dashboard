import { signup } from './action'

export default function SignUpPage() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <label htmlFor="confirm">Password Confirmation:</label>
            <input id="confirm" name="confirm" type="password" required />
            <button formAction={signup}>Sign Up</button>
        </form>
    )
}