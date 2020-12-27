import React from "react";
import {create} from "react-test-renderer"
import Pagination from "./Pagination"

describe("Pagination component test", () => {
    test("pages is 11 but should be allowed only 10", () => {
            const component = create(<Pagination totalUserCount={11} pageSize={1} portionSize={10}/>)
            const root = component.root
            let spans = root.findAllByType("span")
            expect(spans.length).toBe(10)
        })
    test("if page count is more than 10, button should be present", () => {
        const component = create(<Pagination totalUserCount={11} pageSize={1} portionSize={10}/>)
        const root = component.root
        let button = root.findAllByType("button")
        expect(button.length).toBe(1)
    })
})