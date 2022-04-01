import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import SubscribeButton from ".";

jest.mock("next-auth/client");


jest.mock("next/router");

describe("SubscribeButton Componet", () => {
    it("renders correctly when user is not authenticated", () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValue([null, false])

        render(<SubscribeButton />);

        expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
    });

    it("redirect user to sign in when not authenticated", () => {
        const signInMocked = mocked(signIn);
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValue([null, false])

        render(<SubscribeButton />);

        const subscribeButton = screen.getByText("Subscribe Now");

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    })

    it("redirect to posts when user already has a subscription", () => {
        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)
        const pushMock = jest.fn()

        useSessionMocked.mockReturnValue([{
            user: {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
            },
            activeSubscription: 'fake-active-subscription',
            expires: 'fake-expires'
        }, false])
        
        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)

        render(<SubscribeButton />);

        const subscribeButton = screen.getByText("Subscribe Now");

        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalled()
    })
});
