package com.crypto.cool.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

/**
 * Created by ivan on 2/10/17.
 */
public class CryptoCoin {
    private String id;
    private String name;
    private String symbol;
    private int rank;
    private BigDecimal price_usd;
    private BigDecimal price_btc;
    private BigDecimal day_volume_usd;
    private BigDecimal market_cap_usd;
    private BigDecimal available_supply;
    private BigDecimal total_supply;
    private BigDecimal percent_change_1h;
    private BigDecimal percent_change_24h;
    private BigDecimal percent_change_7d;
    private long last_updated;

    public CryptoCoin() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public BigDecimal getPrice_usd() {
        return price_usd;
    }

    public void setPrice_usd(BigDecimal price_usd) {
        this.price_usd = price_usd;
    }

    public BigDecimal getPrice_btc() {
        return price_btc;
    }

    public void setPrice_btc(BigDecimal price_btc) {
        this.price_btc = price_btc;
    }

    @JsonProperty("day_volume_usd")
    public BigDecimal getDay_volume_usd() {
        return day_volume_usd;
    }

    @JsonProperty("24h_volume_usd")
    public void setDay_volume_usd(BigDecimal day_volume_usd) {
        this.day_volume_usd = day_volume_usd;
    }

    public BigDecimal getMarket_cap_usd() {
        return market_cap_usd;
    }

    public void setMarket_cap_usd(BigDecimal market_cap_usd) {
        this.market_cap_usd = market_cap_usd;
    }

    public BigDecimal getAvailable_supply() {
        return available_supply;
    }

    public void setAvailable_supply(BigDecimal available_supply) {
        this.available_supply = available_supply;
    }

    public BigDecimal getTotal_supply() {
        return total_supply;
    }

    public void setTotal_supply(BigDecimal total_supply) {
        this.total_supply = total_supply;
    }

    public BigDecimal getPercent_change_1h() {
        return percent_change_1h;
    }

    public void setPercent_change_1h(BigDecimal percent_change_1h) {
        this.percent_change_1h = percent_change_1h;
    }

    public BigDecimal getPercent_change_24h() {
        return percent_change_24h;
    }

    public void setPercent_change_24h(BigDecimal percent_change_24h) {
        this.percent_change_24h = percent_change_24h;
    }

    public BigDecimal getPercent_change_7d() {
        return percent_change_7d;
    }

    public void setPercent_change_7d(BigDecimal percent_change_7d) {
        this.percent_change_7d = percent_change_7d;
    }

    public long getLast_updated() {
        return last_updated;
    }

    public void setLast_updated(long last_updated) {
        this.last_updated = last_updated;
    }

    @Override
    public String toString() {
        return "CryptoCoin{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", symbol='" + symbol + '\'' +
                ", rank='" + rank + '\'' +
                ", price_usd='" + price_usd + '\'' +
                ", price_btc='" + price_btc + '\'' +
                ", day_volume_usd='" + day_volume_usd + '\'' +
                ", market_cap_usd='" + market_cap_usd + '\'' +
                ", available_supply='" + available_supply + '\'' +
                ", total_supply='" + total_supply + '\'' +
                ", percent_change_1h='" + percent_change_1h + '\'' +
                ", percent_change_24h='" + percent_change_24h + '\'' +
                ", percent_change_7d='" + percent_change_7d + '\'' +
                ", last_updated='" + last_updated + '\'' +
                '}';
    }
}
