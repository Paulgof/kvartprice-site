from api.endpoints import Statistics, Form, FormOptions


def init_api_urls(api):
    api.add_resource(Statistics, '/api/statistics')
    api.add_resource(Form, '/api/form')
    api.add_resource(FormOptions, '/api/form/options')

