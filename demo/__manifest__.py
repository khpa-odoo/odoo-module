{
    'name':"Demo",
    'depends': ['base'],
    'application': True,
    'installable': True,
    'license' : 'LGPL-3',
    'data' : [
        'views/demo_views.xml',
        'views/demo_menus.xml',
        'security/ir.model.access.csv',
    ],
    'assets': {
        'demo.o_demo': [
            'demo/static/src/drawapp/index.js',
            'demo/static/src/bundle/**/*.js',
            'demo/static/src/bundle/**/*.xml',
        ],
    'web.assets_backend': [
            'demo/static/src/demo_action_loader.js',
        ],
    }
}