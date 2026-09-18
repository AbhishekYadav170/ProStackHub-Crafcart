"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          border: "1px solid #e5e5e5",
          borderRadius: "16px",
          padding: "35px",
          background: "#fff",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1px",
              marginBottom: "8px",
            }}
          >
            CARTCRAFT
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "32px",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color: "#737373",
              marginTop: "8px",
            }}
          >
            Create your account and start
            shopping.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d4d4d4",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d4d4d4",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              minLength={6}
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d4d4d4",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              background: "#111",
              color: "#fff",
              fontWeight: 600,
              cursor: loading
                ? "not-allowed"
                : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#737373",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            style={{
              border: "none",
              background: "none",
              fontWeight: 600,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Login
          </button>
        </p>
      </div>
    </main>
  );
}