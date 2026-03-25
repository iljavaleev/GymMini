#include <drogon/drogon.h>
#include <cstdlib>
#include "utils/utils.h"
#include <spdlog/spdlog.h>


void setupCors()
{
    const std::string allowed = "http://localhost";
    drogon::app().registerSyncAdvice([allowed](
        const drogon::HttpRequestPtr &req) -> drogon::HttpResponsePtr {
        if (req->method() == drogon::HttpMethod::Options)
        {
            auto resp = drogon::HttpResponse::newHttpResponse();
            const auto& origin = req->getHeader("Origin");
            if (!origin.empty() && origin == allowed)
            {
                resp->addHeader("Access-Control-Allow-Origin", origin);
            }

            const auto& requestMethod =
                req->getHeader("Access-Control-Request-Method");
            if (!requestMethod.empty())
            {
                resp->addHeader("Access-Control-Allow-Methods", requestMethod);
            }

            resp->addHeader("Access-Control-Allow-Credentials", "true");

            const auto& requestHeaders =
                req->getHeader("Access-Control-Request-Headers");
            if (!requestHeaders.empty())
            {
                resp->addHeader("Access-Control-Allow-Headers", requestHeaders);
            }

            return std::move(resp);
        }
        return {};
    });

    drogon::app().registerPostHandlingAdvice(
        [allowed](const drogon::HttpRequestPtr &req,
           const drogon::HttpResponsePtr &resp) -> void {

            const auto& origin = req->getHeader("Origin");
            if (!origin.empty() && origin == allowed)
            {
                resp->addHeader("Access-Control-Allow-Origin", origin);
            }

            const auto &requestMethod =
                req->getHeader("Access-Control-Request-Method");
            if (!requestMethod.empty())
            {
                resp->addHeader("Access-Control-Allow-Methods", requestMethod);
            }

            resp->addHeader("Access-Control-Allow-Credentials", "true");

            const auto &requestHeaders =
                req->getHeader("Access-Control-Request-Headers");
            if (!requestHeaders.empty())
            {
                resp->addHeader("Access-Control-Allow-Headers", requestHeaders);
            }
        });
}



int main() {
   
    spdlog::set_default_logger(LOGGER);
    spdlog::default_logger()->set_level(spdlog::level::err);
    spdlog::default_logger()->flush_on(spdlog::level::err);

    drogon::app().addListener("0.0.0.0", 8000);
    
    setupCors();
    
    drogon::app().loadConfigFile("/home/iljavaleev/GymMini/backend/config.json");
    drogon::app().run();
    return 0;
}
