# Test file for running API functions (as running code directly within those files can make imports a nightmare).
# It is otherwise safe to remove. 

import back_end_api
import back_end_api.internal_funcs as in_funcs
result = in_funcs.in_get_all_data_for_id(1)
print(result)