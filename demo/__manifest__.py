{
    'name':"Demo",
    'depends': ['spreadsheet','documents'],
    'application': True,
    'installable': True,
    'license' : 'LGPL-3',
    'data' : [
        'views/demo_views.xml',
        'views/demo_menus.xml',
        'security/ir.model.access.csv',
    ],
    'assets': {
        # 'spreadsheet.o_spreadsheet': [
        #     'demo/static/src/bundle/**/*.js',
        #     'demo/static/src/bundle/**/*.xml',
        #     ('remove', 'demo/static/src/bundle/components/control_panel/spreadsheet_breadcrumbs.xml'),
        # ],
        'web.assets_backend': [
            'demo/static/src/demo_view/**/*',
            'demo/static/src/spreadsheet_action_loader.js',
            'demo/static/src/views/**/*',
            # 'demo/static/src/bundle/components/control_panel/spreadsheet_breadcrumbs.xml',
        ],
    }
}