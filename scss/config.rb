# local system compass configuration

require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "../../Public/Stylesheets"
sass_dir = "output"
images_dir = "../../Public/Images"
javascripts_dir = "../../Public/JavaScript"
additional_import_paths = ["base/", "helpers/", "components/", "layout/", "vendors/"]
sass_options = {:sourcemap => true}
http_images_path = "../Images"

# You can select your preferred output style here (can be overridden via the command line):
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
 line_comments = true

#set local cache path
cache = true
cache_path = '/Temp/.sass-cache/testing'

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass output scss && rm -rf sass && mv scss sass
