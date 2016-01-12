exports.config =

    # See docs at http://brunch.readthedocs.org/en/latest/config.html.

    paths:
        public:  'public'

    conventions:
        vendor:  /(vendor)|(tests)(\/|\\)/ # do not wrap tests in modules

    files:
        javascripts:
            joinTo:
                'index.js': /^app/
            order:
                # Files in `vendor` directories are compiled before other files
                # even if they aren't specified in order.
                before: [
                ]
