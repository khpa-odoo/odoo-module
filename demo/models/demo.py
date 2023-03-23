from odoo import _, fields, models, api

class Demo(models.Model):
    _name = "demo.demo"

    name = fields.Char(required=True, string="Title")

    @api.model
    def action_create_demo(self,vals=None):
        return {
            'type' : 'ir.actions.client',
            'tag' : 'action_open_demo',
        }