---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by ruochenhua.
--- DateTime: 2018/5/20 下午2:30
---

local client_io = {}
client_io.__index = client_io

local lsocket = require("lsocket")

function client_io.new()
    local fd = assert(lsocket.connect("127.0.0.1", 8888))
    return setmetatable({fd = {fd}}, client_io)
end

function client_io:mainloop(timeout)
    local rd, wt = lsocket.select(self.fd, self.fd, timeout)
    if rd then

    end

    if wt then

    end
end

return client_io