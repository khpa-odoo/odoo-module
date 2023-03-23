from odoo import _, fields, models, api

class Demo(models.Model):
    _name = "demo.demo"

    name = fields.Char(required=True, translate=True)
    sequence = fields.Integer(default=100)
    data = fields.Binary(required=True)
    handler = fields.Selection(
        [("spreadsheet", "Spreadsheet")], ondelete={"spreadsheet": "cascade"}
    )

    @api.model
    def action_create_spreadsheet(self, demo_vals=None):
        if demo_vals is None:
            demo_vals = {}
        spreadsheet = self.env["demo.demo"].create({
            "name": self.name,
            "mimetype": "application/o-spreadsheet",
            "handler": "spreadsheet",
            "datas": self.data,
            **demo_vals,
        })
        return {
            "type": "ir.actions.client",
            "tag": "action_open_spreadsheet",
            "params": {
                "spreadsheet_id": spreadsheet.id,
                "convert_from_template": True,
            },
        }

    # @api.model
    # def create(self, vals_list):
    #     demo = super().create(vals_list)
    #     return demo.action_open_new_spreadsheet()