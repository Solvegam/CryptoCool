package com.crypto.cool.service.impl;

import com.crypto.cool.dto.CryptoCoin;
import com.crypto.cool.service.CryptoCoins;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Created by ivan on 2/10/17.
 */
@Component
public class CryptoCoinsImpl implements CryptoCoins {
    @Override
    public List<CryptoCoin> getBestCoins() throws IOException {
        URL url = new URL("https://api.coinmarketcap.com/v1/ticker/");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        ObjectMapper mapper = new ObjectMapper();

        BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();


        List<CryptoCoin> result = mapper.readValue(response.toString(),
                TypeFactory.defaultInstance().constructCollectionType(List.class, CryptoCoin.class));
        return sortCoins(result);
    }

    private List<CryptoCoin> sortCoins(List<CryptoCoin> allCoins) {
        List<CryptoCoin> sortedList = allCoins.stream()
                .filter(cryptoCoin -> cryptoCoin.getPercent_change_24h() != null)
                .sorted(Comparator.comparing(CryptoCoin::getPercent_change_24h))
                .collect(Collectors.toList());
        Collections.reverse(sortedList);
        return sortedList;
    }
}
