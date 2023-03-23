from odoo import _, fields, models, api

class Demo(models.Model):
    _name = "demo.demo"
    _inherit = ["spreadsheet.collaborative.mixin"]

    handler = fields.Selection(
        [("spreadsheet", "Spreadsheet")], ondelete={"spreadsheet": "cascade"}
    )

    @api.model
    def action_open_new_spreadsheet(self, vals=None):
        if vals is None:
            vals = {}
        spreadsheet = self.create({
            "name": _("Untitled spreadsheet"),
            "handler": "spreadsheet",
            **vals,
        })
        return {
            "type": "ir.actions.client",
            "tag": "action_open_spreadsheet",
            "params": {
                "spreadsheet_id": spreadsheet.id,
                "is_new_spreadsheet": True,
            },
        }

    @api.model
    def create(self, vals_list):
        demo = super().create(vals_list)
        return demo.action_open_new_spreadsheet()