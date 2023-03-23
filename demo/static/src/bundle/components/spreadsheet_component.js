/** @odoo-module */

import { useSubEnv } from "@odoo/owl";
import { jsonToBase64 } from "@spreadsheet_edition/bundle/helpers";
import spreadsheet from "@spreadsheet/o_spreadsheet/o_spreadsheet_extended";
import SpreadsheetComponent from "@spreadsheet_edition/bundle/actions/spreadsheet_component";
import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { sprintf } from "@web/core/utils/strings";

const { Model } = spreadsheet;

patch(SpreadsheetComponent.prototype, "documents_spreadsheet.SpreadsheetComponent", {
    setup() {
        this._super();
        useSubEnv({
            saveAsTemplate: this._saveAsTemplate.bind(this),
        });
    },

    /**
     * @private
     * @returns {Promise}
     */
    async _saveAsTemplate() {
        const model = new Model(this.model.exportData(), {
            custom: {
                env: this.env,
                dataSources: this.model.config.custom.dataSources,
            },
        });
        await model.config.custom.dataSources.waitForAllLoaded();
        const proms = [];
        for (const pivotId of model.getters.getPivotIds()) {
            proms.push(model.getters.getPivotDataSource(pivotId).prepareForTemplateGeneration());
        }
        await Promise.all(proms);
        model.dispatch("CONVERT_PIVOT_TO_TEMPLATE");
        const data = model.exportData();
        const name = this.props.name;

        this.action.doAction("documents_spreadsheet.save_spreadsheet_template_action", {
            additionalContext: {
                default_template_name: sprintf(_t("%s - Template"), name),
                default_data: jsonToBase64(data),
                default_thumbnail: this.getThumbnail(),
            },
        });
    },
});
