package com.budit.study.websocket.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@ServerEndpoint(value = "/chat")
public class ChatService {
    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<>());

    @OnOpen
    public void onOpen(Session session) {
        log.info("open session: {}", session.toString());
        if (!clients.contains(session)) {
            clients.add(session);
            log.info("Added!");
        } else {
            log.info("Already connected!!");
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        log.info("Receive message: {}", message);
        for (Session s : clients) {
            s.getBasicRemote().sendText(message);
        }
    }

    @OnClose
    public void onClose(Session session) {
        log.info("Disconnected: {}", session.toString());
        clients.remove(session);
    }
}
