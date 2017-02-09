package com.crypto.cool.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.crypto.cool.dto.CardDto;
import com.crypto.cool.service.IBMService;
import com.ibm.watson.developer_cloud.alchemy.v1.AlchemyDataNews;
import com.ibm.watson.developer_cloud.alchemy.v1.model.DocumentsResult;

@Component
public class IBMServiceImpl implements IBMService {

	private static final List<CardDto> MOCKED_DATA = new ArrayList<>();

	static {
		MOCKED_DATA.add(new CardDto("Bitcoin", BigDecimal.valueOf(981.22), "-7.85%"));
		MOCKED_DATA.add(new CardDto("Ethereum", BigDecimal.valueOf(10.98), "-4.05%"));
		MOCKED_DATA.add(new CardDto("Ripple", BigDecimal.valueOf(0.006284), "-2.87%"));
		MOCKED_DATA.add(new CardDto("Litecoin", BigDecimal.valueOf(3.80), "-5.69%"));
		MOCKED_DATA.add(new CardDto("Monero", BigDecimal.valueOf(12.17), "-5.30%"));
		MOCKED_DATA.add(new CardDto("Dash", BigDecimal.valueOf(16.33), "-5.23%"));
		MOCKED_DATA.add(new CardDto("NEM", BigDecimal.valueOf(0.006404), "-2.77%%"));
		MOCKED_DATA.add(new CardDto("Augur", BigDecimal.valueOf(4.28), "-5.97%"));
		MOCKED_DATA.add(new CardDto("Iconomi", BigDecimal.valueOf(0.439588), "-10.10%"));
		MOCKED_DATA.add(new CardDto("Steem", BigDecimal.valueOf(0.144386), "-6.87%"));
		MOCKED_DATA.add(new CardDto("Factom", BigDecimal.valueOf(3.40), "-8.48%"));
		MOCKED_DATA.add(new CardDto("Tether", BigDecimal.valueOf(0.999999), "0.00%"));
		MOCKED_DATA.add(new CardDto("Waves", BigDecimal.valueOf(0.242801), "-9.04%"));
		MOCKED_DATA.add(new CardDto("Golem", BigDecimal.valueOf(0.027480), "11.94%"));
		MOCKED_DATA.add(new CardDto("Golem", BigDecimal.valueOf(0.000205), "-2.42%"));
	}

	@Override
	public List<CardDto> getCardsValues() {
		// TODO: 2/9/17 now it's return mock but have to return aggregated watson data

		return MOCKED_DATA;
	}

	private void aggregateData(){
		// TODO: 2/9/17 implement
		// TODO: 2/9/17 something like that


		AlchemyDataNews service = new AlchemyDataNews();
		service.setApiKey("d816d0de9724e4f9d1588afaf56f601c9dfd0268");

		Map<String, Object> params = new HashMap<>();

		params.put(AlchemyDataNews.RETURN, "enriched.url.title,enriched.url.url,enriched.url.author,enriched.url.publicationDate,enriched.url.enrichedTitle.entities,enriched.url.enrichedTitle.docSentiment");
		params.put(AlchemyDataNews.START, "1440720000");
		params.put(AlchemyDataNews.END, "1441407600");
		params.put(AlchemyDataNews.COUNT, 7);

		DocumentsResult result = service.getNewsDocuments(params).execute();
	}
}
