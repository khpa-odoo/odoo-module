/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { ListController } from "@web/views/list/list_controller";
import { DemoSpreadsheetControllerMixin } from "../demo_spreadsheet_controller_mixin";

patch(ListController.prototype, "demo_spreadsheet_list_controller", DemoSpreadsheetControllerMixin);
