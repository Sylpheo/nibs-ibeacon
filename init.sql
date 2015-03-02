CREATE TABLE IF NOT EXISTS tokens (
    userId           BIGSERIAL,
    externalUserId   TEXT,
    token            TEXT NOT NULL UNIQUE,
    created          TIMESTAMP DEFAULT now()
  );

CREATE TABLE IF NOT EXISTS wallet (
    userId       BIGINT,
    offerId      BIGINT
  );


CREATE SCHEMA IF NOT EXISTS salesforce;

CREATE TABLE IF NOT EXISTS salesforce.contact (
    id              BIGSERIAL,
    firstName       TEXT,
    lastName        TEXT,
    email           TEXT,
    mobilePhone     TEXT,
    leadsource      TEXT,
    accountid       TEXT,
    pictureURL__c   TEXT,
    preference__c   TEXT,
    size__c         TEXT,
    loyaltyid__c    TEXT,
    password__c     TEXT,
    fbUserId__c     TEXT,
    gender__c       TEXT,
    createddate     timestamp
  );

CREATE TABLE IF NOT EXISTS salesforce.interaction__c (
    id                      BIGSERIAL,
    contact__loyaltyid__c   TEXT,
    campaign__c             TEXT,
    product__c              TEXT,
    type__c                 TEXT,
    name__c                 TEXT,
    picture__c              TEXT,
    points__c               double precision,
    createddate             timestamp
  );

DROP TABLE IF EXISTS salesforce.campaign;
CREATE TABLE IF NOT EXISTS salesforce.campaign (
    id              BIGSERIAL PRIMARY KEY,
    sfId            TEXT,
    name            TEXT,
    startdate       DATE,
    enddate         DATE,
    description     TEXT,
    image__c        TEXT,
    campaignpage__c TEXT,
    publishdate__c  DATE,
    type            TEXT,
    status          TEXT
  );

DROP TABLE IF EXISTS salesforce.product2;
CREATE TABLE IF NOT EXISTS salesforce.product2 (
    id              BIGSERIAL PRIMARY KEY,
    name            TEXT,
    description     TEXT,
    image__c        TEXT,
    productpage__c  TEXT,
    publishdate__c  DATE
  );

DROP TABLE IF EXISTS salesforce.hotel__c;
CREATE TABLE IF NOT EXISTS salesforce.hotel__c (
    id                      BIGSERIAL PRIMARY KEY,
    name                    TEXT,
    location__latitude__s   TEXT,
    location__longitude__s  TEXT
  );

DROP TABLE IF EXISTS salesforce.store__c;
CREATE TABLE IF NOT EXISTS salesforce.store__c (
    id                      BIGSERIAL PRIMARY KEY,
    name                    TEXT,
    location__latitude__s   TEXT,
    location__longitude__s  TEXT
  );

INSERT INTO salesforce.campaign (id, name, description, image__c, type, status) VALUES
    (1, 'DGJ Organics / Argan Oil Shampoo / 250ml', 'Our Argan Oil Shampoo will strengthen, repair, nourish and reduce frizz. This specially formulated Shampoo with Moroccan Organic Argan Oil and rich in vitamin E, is designed for coloured, over-processed or unmanageable hair damaged by heat styling. The nourishing ingredients and gentle formula cleanse away daily impurities, whilst restoring moisture and repairing hair from within.', 'img/shampoo.jpg', 'Offer', 'In Progress'),
    (2, 'Heal Your Skin Lotion', 'Dry skin can be the result of genetics, environmental hazards like harsh soaps or extreme weather conditions.  This lotion was created to fix dry, itchy skin and eczema and do just what it says: heal your skin!
This formula combines essential oils and flower extracts, known for their healing qualities, with natural, Paraben-Free lotion.  The result is a therapeutic blend that nourishes, repairs and heals. This has become my daily go to lotion!  The whole family uses it and no more itchy dry skin.
My son''s eczema is finally resolving! There are no harmful chemicals and the scent is amazing!', 'img/lotion_massage.jpg', 'Offer', 'In Progress'),
    (3, 'Lust & Laune Rosé 2015
three bottles pack', 'As the name already implies, our Lust & Laune Rosé offers pure pleasure. A cuvée consisting mainly of Zweigelt and Pinot Noir, it is widely versatile either as an accompaniment for snacks or as a liquid complement to relaxed discussions.

*Clear, lustrous pink-rosé, fine fragrance of fresh red fruits,  highlighted by subtle spicy nuances, in equal measure fresh  and fruity on the palate, altogether very well-rounded, lively  and exhilarating, offering immense drinking pleasure.

*Excellent with snacks, but also goes superbly with salmon  and all that can be conjured up from it.', 'img/zull-wine-design.jpg', 'Offer', 'In Progress');
    

INSERT INTO salesforce.product2 (id, name, description, image__c) VALUES
    (1, 'Caramelized Almonds', 'Addictive treats from the popular new boutique chocolatier in San Francisco''s Mission District.', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/nibs/feve1.jpg'),
    (2, 'Chocolate Stout', 'For the chocolate tilted beer lover, as chocolate stout that is sure to refresh.', 'https://s3-us-west-2.amazonaws.com/sfdc-nibs-demo/chocolate_camarao.jpg'),
    (3, 'Dandelion Assortment', 'Bring the flavor of San Francisco boutique chocolate into your home, or present as a gift to the foodie in your life.', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/nibs/dandelion2.jpg'),
    (4, 'Dandelion Small Batch', 'Experience the buzz around San Francisco''s newest boutique chocolatier. These beans are slow roasted whole for unparalleled flavor depth.', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/nibs/dandelion1.jpg'),
    (5, 'Matzo Crunch', 'A uniquely crunchy treat. So good we had to offer it all year round.', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/nibs/matzo.jpg'),
    (6, 'Patric IN-NIB-ITABLE', 'For the Nibs lovers in your life: a bar of 72% cacao, dark, sweet and strewn with crunchy nibs.', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/nibs/patric2.jpg'),
    (7, 'Patric Limited Edition', 'Salt and chocolate meet in a single bar. For sophisticated palettes.', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/nibs/patric3.jpg'),
    (8, 'Patric Mizzou Crunch', 'Some love smooth, some love crunch. This is a crunch! Lively on the palette.', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/nibs/patric1.jpg');

INSERT INTO salesforce.hotel__c (id, name, location__latitude__s, location__longitude__s) VALUES
    (1, 'Marquis', 37.785143, -122.403405),
    (2, 'Mercure', 37.786164, -122.410137),
    (3, 'Hyatt', 37.794157, -122.396311)

INSERT INTO salesforce.store__c (id, name, location__latitude__s, location__longitude__s) VALUES
    (1, 'Marquis', 37.785143, -122.403405),
    (2, 'Hilton', 37.786164, -122.410137),
    (3, 'Hyatt', 37.794157, -122.396311)
