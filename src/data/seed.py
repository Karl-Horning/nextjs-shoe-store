import boto3
from decimal import Decimal

dynamodb = boto3.resource("dynamodb")
order_table = dynamodb.Table("OrderTable")
shoe_table = dynamodb.Table("ShoeTable")


def seed_database():
    # Define items to be inserted into the OrderTable
    order_items = [
        {
            "OrderId": "89d7ab43-f11c-4f08-a25f-505a82376a2a",
            "FullName": "John Doe",
            "EmailAddress": "john.doe@example.com",
            "PhoneNumber": "123-456-7890",
            "StreetAddress": "123 Main St",
            "CityTown": "Anytown",
            "StateProvinceRegion": "CA",
            "PostCode": "12345",
            "Country": "United States",
            "Size": [40, 42],
            "ShoeId": ["ad8bd387-511e-44b4-8c2f-c1902bc8b764", "923e0c42-c180-4fc0-9796-bcd4902ffdfe"]
        },
    ]

    # Define items to be inserted into the ShoeTable
    shoe_items = [
        {
            "ShoeId": "ad8bd387-511e-44b4-8c2f-c1902bc8b764",
            "Brand": "Nike",
            "Model": "Pegasus FlyEase By You",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("139.99"),
            "Image": "nike_pegasus_flyease_by_you.png"
        },
        {
            "ShoeId": "923e0c42-c180-4fc0-9796-bcd4902ffdfe",
            "Brand": "New Balance",
            "Model": "RC3",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("109.99"),
            "Image": "new_balance_rc30.png"
        },
        {
            "ShoeId": "981ced76-570c-42f9-bba5-712f84d826a2",
            "Brand": "Under Armour",
            "Model": "Flow Dynamic Training Shoes",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("58.99"),
            "Image": "under_armour_flow_dynamic_training_shoes.png"
        },
        {
            "ShoeId": "1e7e418a-2182-4e85-8eb8-583fc2b7a20a",
            "Brand": "Nike",
            "Model": "Nike Air Max Dn",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("154.99"),
            "Image": "nike_nike_air_max_dn.jpg"
        },
        {
            "ShoeId": "a16eb4e2-127b-4b72-ad93-bd83843f98fe",
            "Brand": "Reebok",
            "Model": "NFX Trainers",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("54.99"),
            "Image": "reebok_nfx_trainers.png"
        },
        {
            "ShoeId": "cc8887a4-752f-4b6d-be70-c4d76d1c096a",
            "Brand": "Superga",
            "Model": "2750 OTU CLASSIC",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("51.99"),
            "Image": "superga_2750_cotu_classic.jpg"
        },
        {
            "ShoeId": "15ba63ce-eb1b-41fe-ab91-69d11806b932",
            "Brand": "Nike",
            "Model": "Metcon 9",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("72.99"),
            "Image": "nike_metcon_9.png"
        },
        {
            "ShoeId": "2c5d51d8-628f-40c5-abb7-c0de9eb49f58",
            "Brand": "On Running",
            "Model": "Cloud 5 Waterproof",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("169.99"),
            "Image": "on_running_cloud_5_waterproof.png"
        },
        {
            "ShoeId": "dbbbcede-f50f-4712-8248-86220df6c63f",
            "Brand": "Adidas",
            "Model": "Originals Stan Smith Recon Leather Sneakers",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("84.99"),
            "Image": "adidas_originals_stan_smith_recon_leather_sneakers.png"
        },
        {
            "ShoeId": "b7d5ae03-8037-432b-a03e-feee491711c3",
            "Brand": "Nike",
            "Model": "Ai Max 95",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("174.99"),
            "Image": "nike_air_max_95.png"
        },
        {
            "ShoeId": "c1d84e20-4375-4517-92d6-255edd51c535",
            "Brand": "Fushiton",
            "Model": "Running Shoes",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("30.99"),
            "Image": "fushiton_running_shoes.png"
        },
        {
            "ShoeId": "abed3e2c-0ffb-4951-b1a6-8d6923b55099",
            "Brand": "Vans",
            "Model": "Old Skool Overt CC Shoes",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("39.99"),
            "Image": "vans_old_skool_overt_cc_shoes.jpg"
        },
        {
            "ShoeId": "56825d15-90da-4dba-ba61-e577128ef711",
            "Brand": "ASICS",
            "Model": "GEL KAYANO 29",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("84.99"),
            "Image": "asics_gel_kayano_29.png"
        },
        {
            "ShoeId": "04c15451-fdfe-441e-bf62-20d36a561050",
            "Brand": "Axel",
            "Model": "Arigato Clean 90",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("209.99"),
            "Image": "axel_arigato_clean_90.jpg"
        },
        {
            "ShoeId": "39113d17-4ca6-4e87-9a0f-67ca5732eec9",
            "Brand": "Balenciaga",
            "Model": "Triple Slow-top sneakers",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("517.99"),
            "Image": "balenciaga_triple_s_low_top_sneakers.png"
        },
        {
            "ShoeId": "24622548-f2e1-4dda-9918-b0b85349bfbd",
            "Brand": "Converse",
            "Model": "Chuck Taylor All Star Classic",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("41.99"),
            "Image": "converse_chuck_taylor_all_star_classic.png"
        },
        {
            "ShoeId": "ee9f0fcb-ce47-462e-88dd-e53398762d23",
            "Brand": "Veja",
            "Model": "Esplar Rubber-Trimmed Leather Sneakers",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("119.99"),
            "Image": "veja_esplar_rubber_trimmed_leather_sneakers.png"
        },
        {
            "ShoeId": "f8bf5aa0-e75d-421f-a442-ba503354afff",
            "Brand": "Gucci",
            "Model": "Ace Embroidered Sneaker",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("589.99"),
            "Image": "gucci_ace_embroidered_sneaker.png"
        },
        {
            "ShoeId": "5bd7490e-5f22-41d3-8bc7-f927efdd1f74",
            "Brand": "Gola",
            "Model": "Harrier Suede Lace Up Trainers",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("68.99"),
            "Image": "gola_harrier_suede_lace_up_trainers.png"
        },
        {
            "ShoeId": "73321c5c-2834-4aa3-9120-990f4027dbdb",
            "Brand": "H&M",
            "Model": "White Trainers",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("15.99"),
            "Image": "hm_white_trainers.png"
        },
        {
            "ShoeId": "f40b0f3a-bd88-43cc-903f-957e28af64c8",
            "Brand": "Adidas",
            "Model": "Gazelle Shoes",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("84.99"),
            "Image": "adidas_gazelle_shoes.jpg"
        },
        {
            "ShoeId": "9da10989-9cbb-4cd4-a21b-e2dd7c7722b5",
            "Brand": "Nike",
            "Model": "Air Jordan 1 Mid SE",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("83.99"),
            "Image": "nike_air_jordan_1_mid_se.jpg"
        },
        {
            "ShoeId": "6f950851-e4a8-4973-8bd1-245418dde82f",
            "Brand": "Acne Studios",
            "Model": "ACNE STUDIOS",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("389.99"),
            "Image": "acne_studios_acne_studios.png"
        },
        {
            "ShoeId": "26a9a917-969d-4327-9289-bb6a149cfdd7",
            "Brand": "New Balance",
            "Model": "New Balance bb550",
            "AvailableSizes": ["38", "40", "42", "44", "46"],
            "Price": Decimal("79.99"),
            "Image": "new_balance_new_balance_bb550.jpg"
        }
    ]

    # Put items into the OrderTable
    with order_table.batch_writer() as batch:
        for item in order_items:
            batch.put_item(Item=item)

    # Put items into the ShoeTable
    with shoe_table.batch_writer() as batch:
        for item in shoe_items:
            batch.put_item(Item=item)

    print("Tables seeded successfully!")


if __name__ == "__main__":
    seed_database()
