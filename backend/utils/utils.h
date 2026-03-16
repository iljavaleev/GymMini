#ifndef UTILS_H
#define UTILS_H

#include <string_view>
#include <drogon/HttpAppFramework.h>

#include "spdlog/async.h"
#include "spdlog/sinks/basic_file_sink.h"


inline std::shared_ptr<spdlog::logger> LOGGER = 
    spdlog::basic_logger_mt<spdlog::async_factory>(
        "logger", "../logs/error_logs.txt");


template<typename F>
void sendBadRequest(F&& callback, std::string&& message, 
    drogon::HttpStatusCode status=drogon::HttpStatusCode::k400BadRequest)
{
    Json::Value ret;
    ret["result"] = "failed";
    ret["message"] = std::move(message);
    auto resp = drogon::HttpResponse::newHttpJsonResponse(ret);
    resp->setStatusCode(status);
    callback(resp);
}

#endif