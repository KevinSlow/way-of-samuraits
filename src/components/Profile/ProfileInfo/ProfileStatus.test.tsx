import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

function Button(props:any) {
    return <button>Nothing to do for now</button>;
}

describe("Profile Status Component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const instance = component.getInstance()
        expect(instance.state.status).toBe("it-kamasutra.com");
    });

    test("status from props", () => {
        const component = create(<ProfileStatus text={"it-kamasutra.com"} />);
        const root = component.root
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("status from input", () => {
        const component = create(<ProfileStatus text={"it-kamasutra.com"} />);
        const root = component.root
        expect(() => {
            let input = root.findByType("input")
        }).toThrow();
    });
    test("auto creation span with status should be displayed with correct status", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra.com");
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("it-kamasutra.com");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={mockCallback} />);
        const instance = component.getInstance();
        // @ts-ignore
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});