--
-- PostgreSQL database dump
--

\restrict FqEUJWMCEnOaAgCIveWY91ucEaIzUbEZyx038gQRfIIypSpffJgneY9SLRjUw8I

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

INSERT INTO auth.schema_migrations VALUES ('20171026211738');
INSERT INTO auth.schema_migrations VALUES ('20171026211808');
INSERT INTO auth.schema_migrations VALUES ('20171026211834');
INSERT INTO auth.schema_migrations VALUES ('20180103212743');
INSERT INTO auth.schema_migrations VALUES ('20180108183307');
INSERT INTO auth.schema_migrations VALUES ('20180119214651');
INSERT INTO auth.schema_migrations VALUES ('20180125194653');
INSERT INTO auth.schema_migrations VALUES ('00');
INSERT INTO auth.schema_migrations VALUES ('20210710035447');
INSERT INTO auth.schema_migrations VALUES ('20210722035447');
INSERT INTO auth.schema_migrations VALUES ('20210730183235');
INSERT INTO auth.schema_migrations VALUES ('20210909172000');
INSERT INTO auth.schema_migrations VALUES ('20210927181326');
INSERT INTO auth.schema_migrations VALUES ('20211122151130');
INSERT INTO auth.schema_migrations VALUES ('20211124214934');
INSERT INTO auth.schema_migrations VALUES ('20211202183645');
INSERT INTO auth.schema_migrations VALUES ('20220114185221');
INSERT INTO auth.schema_migrations VALUES ('20220114185340');
INSERT INTO auth.schema_migrations VALUES ('20220224000811');
INSERT INTO auth.schema_migrations VALUES ('20220323170000');
INSERT INTO auth.schema_migrations VALUES ('20220429102000');
INSERT INTO auth.schema_migrations VALUES ('20220531120530');
INSERT INTO auth.schema_migrations VALUES ('20220614074223');
INSERT INTO auth.schema_migrations VALUES ('20220811173540');
INSERT INTO auth.schema_migrations VALUES ('20221003041349');
INSERT INTO auth.schema_migrations VALUES ('20221003041400');
INSERT INTO auth.schema_migrations VALUES ('20221011041400');
INSERT INTO auth.schema_migrations VALUES ('20221020193600');
INSERT INTO auth.schema_migrations VALUES ('20221021073300');
INSERT INTO auth.schema_migrations VALUES ('20221021082433');
INSERT INTO auth.schema_migrations VALUES ('20221027105023');
INSERT INTO auth.schema_migrations VALUES ('20221114143122');
INSERT INTO auth.schema_migrations VALUES ('20221114143410');
INSERT INTO auth.schema_migrations VALUES ('20221125140132');
INSERT INTO auth.schema_migrations VALUES ('20221208132122');
INSERT INTO auth.schema_migrations VALUES ('20221215195500');
INSERT INTO auth.schema_migrations VALUES ('20221215195800');
INSERT INTO auth.schema_migrations VALUES ('20221215195900');
INSERT INTO auth.schema_migrations VALUES ('20230116124310');
INSERT INTO auth.schema_migrations VALUES ('20230116124412');
INSERT INTO auth.schema_migrations VALUES ('20230131181311');
INSERT INTO auth.schema_migrations VALUES ('20230322519590');
INSERT INTO auth.schema_migrations VALUES ('20230402418590');
INSERT INTO auth.schema_migrations VALUES ('20230411005111');
INSERT INTO auth.schema_migrations VALUES ('20230508135423');
INSERT INTO auth.schema_migrations VALUES ('20230523124323');
INSERT INTO auth.schema_migrations VALUES ('20230818113222');
INSERT INTO auth.schema_migrations VALUES ('20230914180801');
INSERT INTO auth.schema_migrations VALUES ('20231027141322');
INSERT INTO auth.schema_migrations VALUES ('20231114161723');
INSERT INTO auth.schema_migrations VALUES ('20231117164230');
INSERT INTO auth.schema_migrations VALUES ('20240115144230');
INSERT INTO auth.schema_migrations VALUES ('20240214120130');
INSERT INTO auth.schema_migrations VALUES ('20240306115329');
INSERT INTO auth.schema_migrations VALUES ('20240314092811');
INSERT INTO auth.schema_migrations VALUES ('20240427152123');
INSERT INTO auth.schema_migrations VALUES ('20240612123726');
INSERT INTO auth.schema_migrations VALUES ('20240729123726');
INSERT INTO auth.schema_migrations VALUES ('20240802193726');
INSERT INTO auth.schema_migrations VALUES ('20240806073726');
INSERT INTO auth.schema_migrations VALUES ('20241009103726');
INSERT INTO auth.schema_migrations VALUES ('20250717082212');
INSERT INTO auth.schema_migrations VALUES ('20250731150234');
INSERT INTO auth.schema_migrations VALUES ('20250804100000');
INSERT INTO auth.schema_migrations VALUES ('20250901200500');
INSERT INTO auth.schema_migrations VALUES ('20250903112500');
INSERT INTO auth.schema_migrations VALUES ('20250904133000');
INSERT INTO auth.schema_migrations VALUES ('20250925093508');
INSERT INTO auth.schema_migrations VALUES ('20251007112900');
INSERT INTO auth.schema_migrations VALUES ('20251104100000');
INSERT INTO auth.schema_migrations VALUES ('20251111201300');


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--



--
-- Data for Name: building; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.building VALUES (1, 'Hayden Library', 'Tempe', -111.938, 33.419);
INSERT INTO public.building VALUES (2, 'Noble Library', 'Tempe', -111.939, 33.417);
INSERT INTO public.building VALUES (3, 'Downtown Campus Library', 'Downtown Phoenix', -111.930, 33.420);
INSERT INTO public.building VALUES (4, 'Memorial Union', 'Tempe', -111.937, 33.425);


--
-- Data for Name: spot; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.spot VALUES (1, 1, 'Lower Level Silent Zone', -1, 60, true, true);
INSERT INTO public.spot VALUES (2, 2, '3rd Floor Pods', 3, 30, true, true);
INSERT INTO public.spot VALUES (3, 2, 'Common Area', 2, 25, true, false);
INSERT INTO public.spot VALUES (4, 3, 'Downtown Library Pods', 1, 16, true, true);
INSERT INTO public.spot VALUES (5, 4, 'MU Study Lounge', 1, 25, true, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Hemant Dua', 'hdua3@asu.edu', 'password1', '2025-11-10 01:15:18.850242');
INSERT INTO public.users VALUES (2, 'Aryash Dubey', 'adubey27@asu.edu', 'password2', '2025-11-10 01:15:18.850242');
INSERT INTO public.users VALUES (3, 'Kanishk Gohil', 'kgohil1@asu.edu', 'password3', '2025-11-10 01:15:18.850242');
INSERT INTO public.users VALUES (4, 'Ethan Ernst', 'eaernst@asu.edu', 'password4', '2025-11-10 01:15:18.850242');


--
-- Data for Name: favorite; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.favorite VALUES (1, 4, '2025-11-10 01:15:22.345289');
INSERT INTO public.favorite VALUES (2, 1, '2025-11-10 01:15:22.345289');
INSERT INTO public.favorite VALUES (3, 2, '2025-11-10 01:15:22.345289');
INSERT INTO public.favorite VALUES (4, 3, '2025-11-10 01:15:22.345289');
INSERT INTO public.favorite VALUES (4, 4, '2025-11-10 01:15:22.345289');
INSERT INTO public.favorite VALUES (1, 1, '2025-12-02 05:33:47.011423');


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rating VALUES (2, 2, 1, 4, 'Mostly quiet, sometimes footsteps', '2025-11-10 01:15:22.345289');
INSERT INTO public.rating VALUES (3, 3, 2, 3, 'Decent, but a bit noisy at peak times', '2025-11-10 01:15:22.345289');
INSERT INTO public.rating VALUES (4, 4, 3, 2, 'Too loud during lunch', '2025-11-10 01:15:22.345289');
INSERT INTO public.rating VALUES (5, 3, 4, 5, 'Amazing pods, very quiet', '2025-11-10 01:15:22.345289');
INSERT INTO public.rating VALUES (6, 1, 5, 3, 'Fine if you have headphones', '2025-11-10 01:15:22.345289');
INSERT INTO public.rating VALUES (7, 2, 4, 4, 'Good balance of quiet and availability', '2025-11-10 01:15:22.345289');
INSERT INTO public.rating VALUES (1, 1, 1, 5, 'Super quiet, perfect for deep work', '2025-11-10 01:15:22.345289');


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

INSERT INTO realtime.schema_migrations VALUES (20211116024918, '2025-11-09 20:45:11');
INSERT INTO realtime.schema_migrations VALUES (20211116045059, '2025-11-09 20:45:14');
INSERT INTO realtime.schema_migrations VALUES (20211116050929, '2025-11-09 20:45:16');
INSERT INTO realtime.schema_migrations VALUES (20211116051442, '2025-11-09 20:45:18');
INSERT INTO realtime.schema_migrations VALUES (20211116212300, '2025-11-09 20:45:21');
INSERT INTO realtime.schema_migrations VALUES (20211116213355, '2025-11-09 20:45:23');
INSERT INTO realtime.schema_migrations VALUES (20211116213934, '2025-11-09 20:45:25');
INSERT INTO realtime.schema_migrations VALUES (20211116214523, '2025-11-09 20:45:27');
INSERT INTO realtime.schema_migrations VALUES (20211122062447, '2025-11-09 20:45:29');
INSERT INTO realtime.schema_migrations VALUES (20211124070109, '2025-11-09 20:45:31');
INSERT INTO realtime.schema_migrations VALUES (20211202204204, '2025-11-09 20:45:33');
INSERT INTO realtime.schema_migrations VALUES (20211202204605, '2025-11-09 20:45:35');
INSERT INTO realtime.schema_migrations VALUES (20211210212804, '2025-11-09 20:45:42');
INSERT INTO realtime.schema_migrations VALUES (20211228014915, '2025-11-09 20:45:44');
INSERT INTO realtime.schema_migrations VALUES (20220107221237, '2025-11-09 20:45:46');
INSERT INTO realtime.schema_migrations VALUES (20220228202821, '2025-11-09 20:45:48');
INSERT INTO realtime.schema_migrations VALUES (20220312004840, '2025-11-09 20:45:50');
INSERT INTO realtime.schema_migrations VALUES (20220603231003, '2025-11-09 20:45:53');
INSERT INTO realtime.schema_migrations VALUES (20220603232444, '2025-11-09 20:45:55');
INSERT INTO realtime.schema_migrations VALUES (20220615214548, '2025-11-09 20:45:58');
INSERT INTO realtime.schema_migrations VALUES (20220712093339, '2025-11-09 20:46:00');
INSERT INTO realtime.schema_migrations VALUES (20220908172859, '2025-11-09 20:46:02');
INSERT INTO realtime.schema_migrations VALUES (20220916233421, '2025-11-09 20:46:04');
INSERT INTO realtime.schema_migrations VALUES (20230119133233, '2025-11-09 20:46:06');
INSERT INTO realtime.schema_migrations VALUES (20230128025114, '2025-11-09 20:46:09');
INSERT INTO realtime.schema_migrations VALUES (20230128025212, '2025-11-09 20:46:11');
INSERT INTO realtime.schema_migrations VALUES (20230227211149, '2025-11-09 20:46:13');
INSERT INTO realtime.schema_migrations VALUES (20230228184745, '2025-11-09 20:46:15');
INSERT INTO realtime.schema_migrations VALUES (20230308225145, '2025-11-09 20:46:17');
INSERT INTO realtime.schema_migrations VALUES (20230328144023, '2025-11-09 20:46:19');
INSERT INTO realtime.schema_migrations VALUES (20231018144023, '2025-11-09 20:46:21');
INSERT INTO realtime.schema_migrations VALUES (20231204144023, '2025-11-09 20:46:25');
INSERT INTO realtime.schema_migrations VALUES (20231204144024, '2025-11-09 20:46:27');
INSERT INTO realtime.schema_migrations VALUES (20231204144025, '2025-11-09 20:46:29');
INSERT INTO realtime.schema_migrations VALUES (20240108234812, '2025-11-09 20:46:31');
INSERT INTO realtime.schema_migrations VALUES (20240109165339, '2025-11-09 20:46:33');
INSERT INTO realtime.schema_migrations VALUES (20240227174441, '2025-11-09 20:46:36');
INSERT INTO realtime.schema_migrations VALUES (20240311171622, '2025-11-09 20:46:39');
INSERT INTO realtime.schema_migrations VALUES (20240321100241, '2025-11-09 20:46:44');
INSERT INTO realtime.schema_migrations VALUES (20240401105812, '2025-11-09 20:46:49');
INSERT INTO realtime.schema_migrations VALUES (20240418121054, '2025-11-09 20:46:52');
INSERT INTO realtime.schema_migrations VALUES (20240523004032, '2025-11-09 20:46:59');
INSERT INTO realtime.schema_migrations VALUES (20240618124746, '2025-11-09 20:47:01');
INSERT INTO realtime.schema_migrations VALUES (20240801235015, '2025-11-09 20:47:03');
INSERT INTO realtime.schema_migrations VALUES (20240805133720, '2025-11-09 20:47:05');
INSERT INTO realtime.schema_migrations VALUES (20240827160934, '2025-11-09 20:47:07');
INSERT INTO realtime.schema_migrations VALUES (20240919163303, '2025-11-09 20:47:10');
INSERT INTO realtime.schema_migrations VALUES (20240919163305, '2025-11-09 20:47:12');
INSERT INTO realtime.schema_migrations VALUES (20241019105805, '2025-11-09 20:47:14');
INSERT INTO realtime.schema_migrations VALUES (20241030150047, '2025-11-09 20:47:22');
INSERT INTO realtime.schema_migrations VALUES (20241108114728, '2025-11-09 20:47:25');
INSERT INTO realtime.schema_migrations VALUES (20241121104152, '2025-11-09 20:47:27');
INSERT INTO realtime.schema_migrations VALUES (20241130184212, '2025-11-09 20:47:29');
INSERT INTO realtime.schema_migrations VALUES (20241220035512, '2025-11-09 20:47:31');
INSERT INTO realtime.schema_migrations VALUES (20241220123912, '2025-11-09 20:47:33');
INSERT INTO realtime.schema_migrations VALUES (20241224161212, '2025-11-09 20:47:35');
INSERT INTO realtime.schema_migrations VALUES (20250107150512, '2025-11-09 20:47:37');
INSERT INTO realtime.schema_migrations VALUES (20250110162412, '2025-11-09 20:47:39');
INSERT INTO realtime.schema_migrations VALUES (20250123174212, '2025-11-09 20:47:41');
INSERT INTO realtime.schema_migrations VALUES (20250128220012, '2025-11-09 20:47:43');
INSERT INTO realtime.schema_migrations VALUES (20250506224012, '2025-11-09 20:47:45');
INSERT INTO realtime.schema_migrations VALUES (20250523164012, '2025-11-09 20:47:47');
INSERT INTO realtime.schema_migrations VALUES (20250714121412, '2025-11-09 20:47:49');
INSERT INTO realtime.schema_migrations VALUES (20250905041441, '2025-11-09 20:47:51');
INSERT INTO realtime.schema_migrations VALUES (20251103001201, '2025-11-20 06:34:37');


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: -
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: -
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

INSERT INTO storage.migrations VALUES (0, 'create-migrations-table', 'e18db593bcde2aca2a408c4d1100f6abba2195df', '2025-11-09 20:45:08.098447');
INSERT INTO storage.migrations VALUES (1, 'initialmigration', '6ab16121fbaa08bbd11b712d05f358f9b555d777', '2025-11-09 20:45:08.10543');
INSERT INTO storage.migrations VALUES (2, 'storage-schema', '5c7968fd083fcea04050c1b7f6253c9771b99011', '2025-11-09 20:45:08.111166');
INSERT INTO storage.migrations VALUES (3, 'pathtoken-column', '2cb1b0004b817b29d5b0a971af16bafeede4b70d', '2025-11-09 20:45:08.139994');
INSERT INTO storage.migrations VALUES (4, 'add-migrations-rls', '427c5b63fe1c5937495d9c635c263ee7a5905058', '2025-11-09 20:45:08.216399');
INSERT INTO storage.migrations VALUES (5, 'add-size-functions', '79e081a1455b63666c1294a440f8ad4b1e6a7f84', '2025-11-09 20:45:08.22012');
INSERT INTO storage.migrations VALUES (6, 'change-column-name-in-get-size', 'f93f62afdf6613ee5e7e815b30d02dc990201044', '2025-11-09 20:45:08.22555');
INSERT INTO storage.migrations VALUES (7, 'add-rls-to-buckets', 'e7e7f86adbc51049f341dfe8d30256c1abca17aa', '2025-11-09 20:45:08.229337');
INSERT INTO storage.migrations VALUES (8, 'add-public-to-buckets', 'fd670db39ed65f9d08b01db09d6202503ca2bab3', '2025-11-09 20:45:08.232767');
INSERT INTO storage.migrations VALUES (9, 'fix-search-function', '3a0af29f42e35a4d101c259ed955b67e1bee6825', '2025-11-09 20:45:08.237192');
INSERT INTO storage.migrations VALUES (10, 'search-files-search-function', '68dc14822daad0ffac3746a502234f486182ef6e', '2025-11-09 20:45:08.261776');
INSERT INTO storage.migrations VALUES (11, 'add-trigger-to-auto-update-updated_at-column', '7425bdb14366d1739fa8a18c83100636d74dcaa2', '2025-11-09 20:45:08.266511');
INSERT INTO storage.migrations VALUES (12, 'add-automatic-avif-detection-flag', '8e92e1266eb29518b6a4c5313ab8f29dd0d08df9', '2025-11-09 20:45:08.275261');
INSERT INTO storage.migrations VALUES (13, 'add-bucket-custom-limits', 'cce962054138135cd9a8c4bcd531598684b25e7d', '2025-11-09 20:45:08.278856');
INSERT INTO storage.migrations VALUES (14, 'use-bytes-for-max-size', '941c41b346f9802b411f06f30e972ad4744dad27', '2025-11-09 20:45:08.282674');
INSERT INTO storage.migrations VALUES (15, 'add-can-insert-object-function', '934146bc38ead475f4ef4b555c524ee5d66799e5', '2025-11-09 20:45:08.307438');
INSERT INTO storage.migrations VALUES (16, 'add-version', '76debf38d3fd07dcfc747ca49096457d95b1221b', '2025-11-09 20:45:08.311143');
INSERT INTO storage.migrations VALUES (17, 'drop-owner-foreign-key', 'f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101', '2025-11-09 20:45:08.314699');
INSERT INTO storage.migrations VALUES (18, 'add_owner_id_column_deprecate_owner', 'e7a511b379110b08e2f214be852c35414749fe66', '2025-11-09 20:45:08.318776');
INSERT INTO storage.migrations VALUES (19, 'alter-default-value-objects-id', '02e5e22a78626187e00d173dc45f58fa66a4f043', '2025-11-09 20:45:08.324689');
INSERT INTO storage.migrations VALUES (20, 'list-objects-with-delimiter', 'cd694ae708e51ba82bf012bba00caf4f3b6393b7', '2025-11-09 20:45:08.32836');
INSERT INTO storage.migrations VALUES (21, 's3-multipart-uploads', '8c804d4a566c40cd1e4cc5b3725a664a9303657f', '2025-11-09 20:45:08.336431');
INSERT INTO storage.migrations VALUES (22, 's3-multipart-uploads-big-ints', '9737dc258d2397953c9953d9b86920b8be0cdb73', '2025-11-09 20:45:08.360481');
INSERT INTO storage.migrations VALUES (23, 'optimize-search-function', '9d7e604cddc4b56a5422dc68c9313f4a1b6f132c', '2025-11-09 20:45:08.373325');
INSERT INTO storage.migrations VALUES (24, 'operation-function', '8312e37c2bf9e76bbe841aa5fda889206d2bf8aa', '2025-11-09 20:45:08.377462');
INSERT INTO storage.migrations VALUES (25, 'custom-metadata', 'd974c6057c3db1c1f847afa0e291e6165693b990', '2025-11-09 20:45:08.381874');
INSERT INTO storage.migrations VALUES (26, 'objects-prefixes', 'ef3f7871121cdc47a65308e6702519e853422ae2', '2025-11-09 20:45:08.385417');
INSERT INTO storage.migrations VALUES (27, 'search-v2', '33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2', '2025-11-09 20:45:08.399946');
INSERT INTO storage.migrations VALUES (28, 'object-bucket-name-sorting', 'ba85ec41b62c6a30a3f136788227ee47f311c436', '2025-11-09 20:45:08.620355');
INSERT INTO storage.migrations VALUES (29, 'create-prefixes', 'a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b', '2025-11-09 20:45:08.627072');
INSERT INTO storage.migrations VALUES (30, 'update-object-levels', '6c6f6cc9430d570f26284a24cf7b210599032db7', '2025-11-09 20:45:08.634357');
INSERT INTO storage.migrations VALUES (31, 'objects-level-index', '33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8', '2025-11-09 20:45:08.641447');
INSERT INTO storage.migrations VALUES (32, 'backward-compatible-index-on-objects', '2d51eeb437a96868b36fcdfb1ddefdf13bef1647', '2025-11-09 20:45:08.64802');
INSERT INTO storage.migrations VALUES (33, 'backward-compatible-index-on-prefixes', 'fe473390e1b8c407434c0e470655945b110507bf', '2025-11-09 20:45:08.654555');
INSERT INTO storage.migrations VALUES (34, 'optimize-search-function-v1', '82b0e469a00e8ebce495e29bfa70a0797f7ebd2c', '2025-11-09 20:45:08.656238');
INSERT INTO storage.migrations VALUES (35, 'add-insert-trigger-prefixes', '63bb9fd05deb3dc5e9fa66c83e82b152f0caf589', '2025-11-09 20:45:08.662054');
INSERT INTO storage.migrations VALUES (36, 'optimise-existing-functions', '81cf92eb0c36612865a18016a38496c530443899', '2025-11-09 20:45:08.665377');
INSERT INTO storage.migrations VALUES (37, 'add-bucket-name-length-trigger', '3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1', '2025-11-09 20:45:08.672829');
INSERT INTO storage.migrations VALUES (38, 'iceberg-catalog-flag-on-buckets', '19a8bd89d5dfa69af7f222a46c726b7c41e462c5', '2025-11-09 20:45:08.676729');
INSERT INTO storage.migrations VALUES (39, 'add-search-v2-sort-support', '39cf7d1e6bf515f4b02e41237aba845a7b492853', '2025-11-09 20:45:08.68733');
INSERT INTO storage.migrations VALUES (40, 'fix-prefix-race-conditions-optimized', 'fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f', '2025-11-09 20:45:08.691476');
INSERT INTO storage.migrations VALUES (41, 'add-object-level-update-trigger', '44c22478bf01744b2129efc480cd2edc9a7d60e9', '2025-11-09 20:45:08.699881');
INSERT INTO storage.migrations VALUES (42, 'rollback-prefix-triggers', 'f2ab4f526ab7f979541082992593938c05ee4b47', '2025-11-09 20:45:08.704683');
INSERT INTO storage.migrations VALUES (43, 'fix-object-level', 'ab837ad8f1c7d00cc0b7310e989a23388ff29fc6', '2025-11-09 20:45:08.709494');
INSERT INTO storage.migrations VALUES (44, 'vector-bucket-type', '99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3', '2025-11-20 06:34:45.943355');
INSERT INTO storage.migrations VALUES (45, 'vector-buckets', '049e27196d77a7cb76497a85afae669d8b230953', '2025-11-20 06:34:46.066962');
INSERT INTO storage.migrations VALUES (46, 'buckets-objects-grants', 'fedeb96d60fefd8e02ab3ded9fbde05632f84aed', '2025-11-20 06:34:46.566425');
INSERT INTO storage.migrations VALUES (47, 'iceberg-table-metadata', '649df56855c24d8b36dd4cc1aeb8251aa9ad42c2', '2025-11-20 06:34:46.640246');
INSERT INTO storage.migrations VALUES (48, 'iceberg-catalog-ids', '2666dff93346e5d04e0a878416be1d5fec345d6f', '2025-11-20 06:34:46.657978');


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: -
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: -
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: building_building_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.building_building_id_seq', 4, true);


--
-- Name: rating_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rating_rating_id_seq', 9, true);


--
-- Name: spot_spot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.spot_spot_id_seq', 5, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

\unrestrict FqEUJWMCEnOaAgCIveWY91ucEaIzUbEZyx038gQRfIIypSpffJgneY9SLRjUw8I

