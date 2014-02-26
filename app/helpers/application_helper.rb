module ApplicationHelper
    def kramdown(text)
        return Kramdown::Document.new(text).to_html
    end
end
