/** @odoo-module **/

import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

export const DemoSpreadsheet = {
    setup() {
        this._super(...arguments);
        this.action = useService("action");
        this.onClickCreateSpreadsheet = this._onClickCreateSpreadsheet.bind(this);
    },

    /**
     * @override
     */
    async onClickCreateSpreadsheet(ev) {
        this.action.doAction({
            type: "ir.actions.client",
            tag: "action_open_spreadsheet",
            params: {
                spreadsheet_id: x,
            },
        });
    }
}