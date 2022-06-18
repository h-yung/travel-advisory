module.exports = mongoose => {
    const Advisory = mongoose.model(
        'advisory',
        mongoose.Schema(
            {
                country: String, //i.e., country destination to enter
                // 'entry last updated': String, //when doc last updated. show using timestamps instead - below.
                'negative covid test required': String, //Yes, No, Depends - avoid Boolean confusion
                'covid test detail': String, //should include date effective 'as of'
                'accepted tests': String,
                'vaccination proof required': String, //Yes, No, Depends - avoid Boolean confusion
                'vaccination proof detail': String, //should include date effective 'as of'
                'accepted proof': [{ type: String }],
                sourceName: String,
                sourceLink1: String,
                sourceLink2: String,
                published: Boolean //what could be a use case? if crowdsourced input, can restrict published thing. Phase out when transit to webscrape
            },
            { timestamps: true }
        )
    );
    return Advisory;
}