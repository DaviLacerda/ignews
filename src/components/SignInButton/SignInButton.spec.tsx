import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/client";
import { SignInButton } from ".";

jest.mock("next-auth/client");

describe("SignInButton Componet", () => {
    it("renders correctly when user is not authenticated", () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SignInButton />);

        expect(screen.getByText("Sign In With GitHub")).toBeInTheDocument();
    });

    it("renders correctly when user is authenticated", () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([{
            user: {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
            },
            expires: '2020-12-31T23:59:59.999Z'
        }, false])

        render(<SignInButton />);

        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
});
