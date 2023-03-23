/** @odoo-module */

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component } from "@odoo/owl";
import { Root } from "../drawapp";

export class DemoAction extends Component {
    setup() {
        this.actionService = useService("action");
    }
}

DemoAction.template = "demo.DemoAction";
DemoAction.components = { Root }

registry.category("actions").add("action_open_demo", DemoAction, { force : true });