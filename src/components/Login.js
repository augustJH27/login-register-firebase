import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory} from "react-router-dom";
import 'firebase/auth';
import firebase from 'firebase/app';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  
  
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
			console.log('error')
    }

    setLoading(false)
  }

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleLoginPopUp = () => {
		firebase.auth()
		.signInWithPopup(googleProvider)
		.then((result) => {
      
			console.log(result);
		}).catch((error) => {
			console.log(error);
	  });
	}
    // const isLoggedIn = props.isLoggedIn;
    // if (isLoggedIn) {
    //   <Redirect to="/Dashboard" />
    // }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Masuk</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Alamat e-mail</Form.Label>
              <Form.Control type="email" placeholder="Masukkan alamat e-mail" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Kata Sandi</Form.Label>
              <Form.Control type="password" placeholder="Masukkan kata sandi" ref={passwordRef} required />
            </Form.Group>
            <br></br>
            <Button disabled={loading} className="w-100" type="submit">
              Masuk
            </Button>
            <br></br>
            <p className="text-center">Atau</p>
            <Button onClick={handleLoginPopUp} className="w-100" type="submit">
              Masuk dengan Google
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Belum mempunyai akun? <Link to="/signup">Daftar sekarang</Link>
      </div>
    </>
  )
}