package com.crypto.cool.service;

import com.crypto.cool.dto.CryptoCoin;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

/**
 * Created by ivan on 2/10/17.
 */
@Component
public interface CryptoCoins {

    public List<CryptoCoin> getBestCoins() throws IOException;
}
