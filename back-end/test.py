# Test file for running API functions (as running code directly within those files can make imports a nightmare).
# It is otherwise safe to remove. 

import back_end_api
result = back_end_api.get_all_data_for_id(2)
print(result)