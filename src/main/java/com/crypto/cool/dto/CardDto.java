package com.crypto.cool.dto;

import java.math.BigDecimal;

public class CardDto {

	private String instrumentName;
	private BigDecimal price;
	private String risk;

	public CardDto(String instrumentName, BigDecimal price, String risk) {
		this.instrumentName = instrumentName;
		this.price = price;
		this.risk = risk;
	}

	public String getInstrumentName() {
		return instrumentName;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public String getRisk() {
		return risk;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}

		CardDto cardDto = (CardDto) o;

		if (instrumentName != null ? !instrumentName.equals(cardDto.instrumentName) : cardDto.instrumentName != null) {
			return false;
		}
		if (price != null ? !price.equals(cardDto.price) : cardDto.price != null) {
			return false;
		}
		return risk != null ? risk.equals(cardDto.risk) : cardDto.risk == null;
	}

	@Override
	public int hashCode() {
		int result = instrumentName != null ? instrumentName.hashCode() : 0;
		result = 31 * result + (price != null ? price.hashCode() : 0);
		result = 31 * result + (risk != null ? risk.hashCode() : 0);
		return result;
	}
}
