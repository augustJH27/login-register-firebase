import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
    <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Daftar</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="name">
              <Form.Label>Nama Depan</Form.Label>
              <Form.Control type="name" placeholder="First Name" ref={firstNameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Nama Belakang</Form.Label>
              <Form.Control type="name" placeholder="Last Name" ref={lastNameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Alamat e-mail</Form.Label>
              <Form.Control type="email" placeholder="Masukkan alamat e-mail" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Buat Kata Sandi</Form.Label>
              <Form.Control type="password" placeholder="Masukkan kata sandi" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Konfirmasi Kata Sandi</Form.Label>
              <Form.Control type="password" placeholder="Ketik ulang kata sandi" ref={passwordConfirmRef} required />
            </Form.Group>
            <br></br>
            <Button disabled={loading} className="w-100" type="submit">
              Buat Akun
            </Button>
          </Form>
        </Card.Body>
        </Card> 
      <div className="w-100 text-center mt-2">
        Sudah mempunyai akun? <Link to="/login">Masuk di sini</Link>
      </div>
    </>
  )
}