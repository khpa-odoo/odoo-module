/** @odoo-module **/
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { session } from "@web/session";

import SpreadsheetComponent from "@spreadsheet_edition/bundle/actions/spreadsheet_component";
import { SpreadsheetName } from "@spreadsheet_edition/bundle/actions/control_panel/spreadsheet_name";

import { UNTITLED_SPREADSHEET_NAME } from "@spreadsheet/helpers/constants";
import { AbstractSpreadsheetAction } from "@spreadsheet_edition/bundle/actions/abstract_spreadsheet_action";

import { Component, useState } from "@odoo/owl";

export class SpreadsheetAction extends AbstractSpreadsheetAction {
    setup() {
        super.setup();
        this.orm = useService("orm");
        this.actionService = useService("action");
        this.notificationMessage = this.env._t("New spreadsheet created in Documents");
        this.state = useState({
            connectedUsers: [{ name: session.username, id: session.uid }],
            isSynced: true,
            isFavorited: false,
            spreadsheetName: UNTITLED_SPREADSHEET_NAME,
        });

    }

    /**
     * Create a new sheet and display it
     */

    async _onNewSpreadsheet() {
        const action = await this.orm.call("documents.document", "action_open_new_spreadsheet");
        this._notifyCreation();
        this.actionService.doAction(action, { clear_breadcrumbs: true });
    }

}

SpreadsheetAction.template = "demo_spreadsheet.SpreadsheetAction";
SpreadsheetAction.components = {
    SpreadsheetComponent,
    SpreadsheetName,
};

registry.category("actions").add("action_open_spreadsheet", SpreadsheetAction, { force: true });
