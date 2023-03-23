/** @odoo-module **/

import { registry } from "@web/core/registry";
import { getBundle, loadBundle } from "@web/core/assets";

const actionRegistry = registry.category("actions");

const loadDemoAction = async (env,actionName,actionLazyLoader) => {
    const desc = await getBundle('demo.o_demo');
    await loadBundle(desc);
}

const loadActionDemo = async (env, context) => {
    await loadDemoAction(env, "action_open_demo", loadActionDemo);

    return {
        ...context,
        target: "current",
        tag: "action_open_demo",
        type: "ir.actions.client",
    };
};

actionRegistry.add("action_open_demo", loadActionDemo);
