package com.budit.study.websocket.config;

import org.jasypt.encryption.StringEncryptor;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JasyptConfigTest {
    Logger log = LoggerFactory.getLogger(getClass());

    @Qualifier("jasyptStringEncryptor")
    @Autowired
    private StringEncryptor stringEncryptor;

    @Test
    public void encrypt() {
        encrypt("test");
        encrypt("test1234");
    }

    private void encrypt(String plainText) {
        String encrypted = stringEncryptor.encrypt(plainText);
        log.info("{}: ENC({})", plainText, encrypted);
        String decrypted = stringEncryptor.decrypt(encrypted);
        Assert.assertEquals("암/복호화 실패", plainText, decrypted);
    }
}
