﻿require.config({
    paths: {
        entityService: "/sitecore/shell/client/Services/Assets/lib/entityservice"
    }
});

define(["sitecore", "jquery", "underscore", "entityService"], function (Sitecore, $, _, entityService) {
    var SitecoreContentEditorTabs = Sitecore.Definitions.App.extend({



        initialized: function () {
            this.GetComponents();
        },

        EntityServiceConfig: function () {
            var componentService = new entityService({
                url: "/sitecore/api/ssc/SitecoreContentEditorTabs-Controllers/Component"
            });

            return componentService;
        },

        GetComponents: function () {
            var datasource = this.DataSource;

            $.ajax({
                url: "/sitecore/api/ssc/SitecoreContentEditorTabs-Controllers/Component/" + this.GetQueryStringParameter("id") + "/GetComponents?database=" + this.GetQueryStringParameter("database"),
                type: "GET",
                contentType: 'application/json',
                context: this,
                success: function (data) {
                    datasource.viewModel.items(data);
                }
            });
        },

        GetQueryStringParameter: function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
    });

    return SitecoreContentEditorTabs;
});